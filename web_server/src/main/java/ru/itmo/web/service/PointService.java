package ru.itmo.web.service;

import org.springframework.stereotype.Service;
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

    private boolean checkHit(double x, double y, double r) {
        // Rectangle in second quadrant
        if (x <= 0 && x >= -r/2 && y >= 0 && y <= r) {
            return true;
        }

        // Triangle in third quadrant
        if (x <= 0 && y <= 0 && y >= -x - r) {
            return true;
        }

        // Quarter circle in first quadrant
        if (x >= 0 && y >= 0 && (x*x + y*y) <= (r*r/4)) {
            return true;
        }

        return false;
    }
}