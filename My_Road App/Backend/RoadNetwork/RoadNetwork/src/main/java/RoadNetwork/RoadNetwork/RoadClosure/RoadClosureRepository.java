package RoadNetwork.RoadNetwork.RoadClosure;// RoadClosureRepository.java
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoadClosureRepository extends JpaRepository<Road, Long> {
    // You can define custom query methods if needed
}
