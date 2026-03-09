package turnhere.dto;

public class AttractionRequest {

    private String name;
    private String type;
    private String description;
    private String address;
    private Long cityId;

    // Constructors
    public AttractionRequest() {
    }

    public AttractionRequest(String name, String type, String description, String address, Long cityId) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.address = address;
        this.cityId = cityId;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getCityId() {
        return cityId;
    }

    public void setCityId(Long cityId) {
        this.cityId = cityId;
    }
}