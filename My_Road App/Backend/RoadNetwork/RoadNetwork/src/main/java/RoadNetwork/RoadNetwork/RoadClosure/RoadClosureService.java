package RoadNetwork.RoadNetwork.RoadClosure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Service
public class RoadClosureService {

    @Autowired
    private RoadClosureRepository roadClosureRepository;
    public List<Road> getAllRoadClosures() {
        return roadClosureRepository.findAll();
    }
}
