package Route.Traffic.com;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrafficRepository extends JpaRepository<Traffic,Integer>{

    Traffic findByCityNameAndStreetName(String cityname, String streetname);
}
