package ru.itmo.web.controller;

import lombok.Data;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.itmo.web.model.Point;
import ru.itmo.web.service.PointService;

import java.util.List;

@RestController
@RequestMapping("/points")
public class PointController {

    private final PointService pointService;

    public PointController(PointService pointService) {
        this.pointService = pointService;
    }

    @PostMapping("/check")
    public Point checkPoint(@RequestBody PointRequest request, Authentication authentication) {
        return pointService.checkPoint(
                request.getX(),
                request.getY(),
                request.getR(),
                authentication.getName()
        );
    }

    @GetMapping
    public List<Point> getUserPoints(Authentication authentication) {
        return pointService.getUserPoints(authentication.getName());
    }

    @Data
    public static class PointRequest {
        private double x;
        private double y;
        private double r;
    }
}
