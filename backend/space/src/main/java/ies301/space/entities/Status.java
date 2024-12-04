package ies301.space.entities;

// private enun status (pending, failed, success)
public enum Status {
    PENDING("pending"),
    FAILED("failed"),
    SUCCESS("success");

    private String status;

    Status(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

}
