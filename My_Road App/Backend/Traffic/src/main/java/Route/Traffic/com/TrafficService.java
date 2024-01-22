package Route.Traffic.com;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@org.springframework.stereotype.Service
public class TrafficService {

    public TrafficRepository repo;

    @Autowired
    public TrafficService(TrafficRepository repo) {
        this.repo = repo;
    }
    public Traffic getTrafficByCityAndStreet(String cityname, String streetname)
    {
        return repo.findByCityNameAndStreetName(cityname, streetname);
    }


}
