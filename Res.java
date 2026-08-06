import java.util.ArrayList;

public class Res {
    private String name;
    private String address;
    private ArrayList<Menuitems> menuitems;
    private String status; // "Open", "Busy", "Closed"

    public Res(String name, String address) {
        this.name = name;
        this.address = address;
        this.menuitems = new ArrayList<>();
        this.status = "Open";
    }

    public String getname() {
        return this.name;
    }

    public void setname(String name) {
        this.name = name;
    }

    public String getaddress() {
        return this.address;
    }

    public void setaddress(String address) {
        this.address = address;
    }

    public ArrayList<Menuitems> getmenuitems() {
        return this.menuitems;
    }

    public void addMenuItem(Menuitems item) {
        this.menuitems.add(item);
    }

    public String getstatus() {
        return this.status;
    }

    public void setstatus(String status) {
        this.status = status;
    }
}
