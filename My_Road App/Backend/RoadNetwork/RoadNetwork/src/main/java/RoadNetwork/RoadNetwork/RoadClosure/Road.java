package RoadNetwork.RoadNetwork.RoadClosure;
import jakarta.persistence.Entity;
import jakarta.persistence.*;


@Entity
@Table(name = "road_closures")
public class Road {
    public Long getRouteId() {
        return routeId;
    }

    public void setRouteId(Long routeId) {
        this.routeId = routeId;
    }

    public String getRouteName() {
        return routeName;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }

    public String getRouteCountry() {
        return routeCountry;
    }

    public void setRouteCountry(String routeCountry) {
        this.routeCountry = routeCountry;
    }

    public String getRouteCity() {
        return routeCity;
    }

    public void setRouteCity(String routeCity) {
        this.routeCity = routeCity;
    }

    public String getTimeClosure() {
        return timeClosure;
    }

    public void setTimeClosure(String timeClosure) {
        this.timeClosure = timeClosure;
    }

    public String getDayClosure() {
        return dayClosure;
    }

    public void setDayClosure(String dayClosure) {
        this.dayClosure = dayClosure;
    }

    public String getReasonClosure() {
        return reasonClosure;
    }

    public void setReasonClosure(String reasonClosure) {
        this.reasonClosure = reasonClosure;
    }

    @Id
    @Column(name = "RouteId")
    private Long routeId;

    @Column(name = "RouteName")
    private String routeName;

    @Column(name = "RouteCountry")
    private String routeCountry;

    @Column(name = "RouteCity")
    private String routeCity;

    @Column(name = "time_closure")
    private String timeClosure;

    @Column(name = "day_closure")
    private String dayClosure;

    @Column(name = "reason_closure")
    private String reasonClosure;

}
