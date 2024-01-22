package RoadNetwork.RoadNetwork.RoadClosure;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.ws.server.endpoint.annotation.*;
import java.util.List;
import java.util.stream.Collectors;
import io.spring.guides.roadclosures.Road;
import io.spring.guides.roadclosures.GetAllRoads;
import io.spring.guides.roadclosures.GetAllRoadsResponse;
import io.spring.guides.roadclosures.Roads;

@Endpoint
@CrossOrigin(origins = "http://localhost:5173")
public class RoadEndpoint {

    private static final String NAMESPACE_URI = "http://spring.io/guides/roadclosures";

    private RoadClosureService roadClosureService;

    @Autowired
    public RoadEndpoint(RoadClosureService roadClosureService) {
        this.roadClosureService = roadClosureService;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "GetAllRoads")
    @ResponsePayload
    public GetAllRoadsResponse getAllRoads(@RequestPayload GetAllRoads request) {
        GetAllRoadsResponse response = new GetAllRoadsResponse();

        List<RoadNetwork.RoadNetwork.RoadClosure.Road> roadClosures = roadClosureService.getAllRoadClosures();

        List<Road> roads = roadClosures.stream()
                .map(this::convertToRoad)
                .collect(Collectors.toList());

        Roads roadsWrapper = new Roads();
        roadsWrapper.getRoad().addAll(roads);
        response.setRoads(roadsWrapper);
        return response;
    }

    private Road convertToRoad(RoadNetwork.RoadNetwork.RoadClosure.Road route) {
        Road road = new Road();
        road.setRouteId(route.getRouteId());
        road.setRouteName(route.getRouteName());
        road.setRouteCountry(route.getRouteCountry());
        road.setRouteCity(route.getRouteCity());
        road.setTimeClosure(route.getTimeClosure());
        road.setDayClosure(route.getDayClosure());
        road.setReasonClosure(route.getReasonClosure());
        return road;
    }
}
