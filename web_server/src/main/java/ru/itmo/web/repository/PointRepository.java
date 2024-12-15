package ru.itmo.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.itmo.web.model.Point;
import ru.itmo.web.model.User;

import java.util.List;

public interface PointRepository extends JpaRepository<Point, Long> {
    List<Point> findByUserOrderByTimestampDesc(User user);
    void deleteByUser(User user);
}