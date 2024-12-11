package ru.itmo.web.controller;

import lombok.Data;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.itmo.web.model.Point;
import ru.itmo.web.service.PointService;

import java.util.List;

@RestController
@RequestMapping("/points")
public class PointController {
    private static final Logger logger = LogManager.getLogger(PointController.class);

    private final PointService pointService;

    public PointController(PointService pointService) {
        this.pointService = pointService;
    }

    @PostMapping("/check")
    public Point checkPoint(@RequestBody PointRequest request, Authentication authentication) {
        logger.info("The server accepts values!");
        logger.info("x: " + request.getX());
        logger.info("y: " + request.getY());
        logger.info("r: " + request.getR());
        logger.info("name: " + authentication.getName());

        return pointService.checkPoint(
                request.getX(),
                request.getY(),
                request.getR(),
                authentication.getName()
        );
    }

    @GetMapping
    public List<Point> getUserPoints(Authentication authentication) {
        logger.info("The server returns all user points with the name: " + authentication.getName());
        return pointService.getUserPoints(authentication.getName());
    }

    @Data
    public static class PointRequest {
        private double x;
        private double y;
        private double r;
    }
}
