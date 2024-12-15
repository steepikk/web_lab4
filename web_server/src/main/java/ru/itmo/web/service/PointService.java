package ru.itmo.web.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.itmo.web.model.Point;
import ru.itmo.web.model.User;
import ru.itmo.web.repository.PointRepository;
import ru.itmo.web.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PointService {

    private final PointRepository pointRepository;
    private final UserRepository userRepository;

    public PointService(PointRepository pointRepository, UserRepository userRepository) {
        this.pointRepository = pointRepository;
        this.userRepository = userRepository;
    }

    public Point checkPoint(double x, double y, double r, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Point point = new Point();
        point.setX(x);
        point.setY(y);
        point.setR(r);
        point.setTimestamp(LocalDateTime.now());
        point.setUser(user);
        point.setHit(checkHit(x, y, r));

        return pointRepository.save(point);
    }

    public List<Point> getUserPoints(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return pointRepository.findByUserOrderByTimestampDesc(user);
    }

    public void deletePoint(Long id, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Point point = pointRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Point not found"));

        if (!point.getUser().equals(user)) {
            throw new RuntimeException("Unauthorized to delete this point");
        }

        pointRepository.deleteById(id);
    }

    @Transactional
    public void clearPoints(String username) {
        System.out.println("Clear points" + username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        pointRepository.deleteByUser(user);
    }

    private boolean checkHit(double x, double y, double r) {
        if (x <= 0 && x >= -r/2 && y >= 0 && y <= r) {
            return true;
        }

        if (x <= 0 && y <= 0 && y >= -x - r) {
            return true;
        }

        if (x >= 0 && y <= 0 && (x*x + y*y) <= (r*r/4)) {
            return true;
        }

        return false;
    }
}
