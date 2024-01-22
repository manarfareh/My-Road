package Route.Traffic.com;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import com.traffic.route.GetTrafficResponse;
import com.traffic.route.GetTrafficRequest;


@Endpoint
@CrossOrigin(origins = "http://127.0.0.1:5173/")
public class EndPoint {
    private static final String NAMESPACE_URI = "http://Route.Traffic.com";

    @Autowired
    public Route.Traffic.com.TrafficService trservice;

    @CrossOrigin(origins = "http://localhost:3000")
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getTrafficRequest")
    @ResponsePayload
    public GetTrafficResponse getTraffic(@RequestPayload GetTrafficRequest request) {
        GetTrafficResponse response = new GetTrafficResponse();
        Traffic traffic = trservice.getTrafficByCityAndStreet(request.getCityName(), request.getStreetName());

        com.traffic.route.Traffic Newtraffic = convertToTraffic(traffic);

        response.setTraffic(Newtraffic);

        return response;
    }

    private com.traffic.route.Traffic convertToTraffic(Route.Traffic.com.Traffic routeTraffic) {
        com.traffic.route.Traffic traffic = new com.traffic.route.Traffic();
        traffic.setId(routeTraffic.getId());
        traffic.setTrafficPercentage(routeTraffic.getTrafficPercentage());
        traffic.setCityName(routeTraffic.getCityName());
        traffic.setCountryName(routeTraffic.getCountryName());
        traffic.setStreetName(routeTraffic.getStreetName());
        return traffic;
    }
}



