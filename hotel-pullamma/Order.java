import java.util.ArrayList;

public class Order {
    private static int orderCount = 0; // Class variable to track order numbers

    private int orderNo;
    private String customerName;
    private ArrayList<Menuitems> menuitems;
    private String status; // "Pending", "Preparing", "Ready", "Delivered"
    private double discountApplied; // Discount percentage (e.g. 10.0 for 10%)
    private double finalPrice;

    public Order(String customerName, ArrayList<Menuitems> menuitems, double discountApplied) {
        orderCount++;
        this.orderNo = orderCount;
        this.customerName = customerName;
        this.menuitems = menuitems;
        this.status = "Pending";
        this.discountApplied = discountApplied;
        this.finalPrice = calculateFinalPrice();
        
        // Track stats: increment total orders for each item
        for (Menuitems item : menuitems) {
            item.incrementtotalorders();
        }
    }

    private double calculateFinalPrice() {
        double itemTotal = 0.0;
        for (Menuitems item : menuitems) {
            itemTotal += item.getprice();
        }
        
        if (itemTotal == 0.0) {
            return 0.0;
        }

        double discount = (discountApplied / 100.0) * itemTotal;
        double gst = 0.05 * itemTotal;
        double deliveryFee = 29.0;
        double packagingFee = 15.0;
        
        double grandTotal = itemTotal - discount + gst + deliveryFee + packagingFee;
        return Math.round(grandTotal * 100.0) / 100.0; // Round to 2 decimal places
    }

    public int getorderNo() {
        return this.orderNo;
    }

    public String getcustomerName() {
        return this.customerName;
    }

    public ArrayList<Menuitems> getmenuitems() {
        return this.menuitems;
    }

    public String getstatus() {
        return this.status;
    }

    public void setstatus(String status) {
        this.status = status;
    }

    public double getdiscountApplied() {
        return this.discountApplied;
    }

    public double getfinalPrice() {
        return this.finalPrice;
    }

    // Convert Order details into a JSON format for the front-end dashboard
    public String toJson() {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        sb.append("\"orderNo\":").append(orderNo).append(",");
        sb.append("\"customerName\":\"").append(customerName.replace("\"", "\\\"")).append("\",");
        sb.append("\"status\":\"").append(status).append("\",");
        sb.append("\"discountApplied\":").append(discountApplied).append(",");
        sb.append("\"finalPrice\":").append(finalPrice).append(",");
        sb.append("\"items\":[");
        for (int i = 0; i < menuitems.size(); i++) {
            Menuitems item = menuitems.get(i);
            sb.append("{");
            sb.append("\"name\":\"").append(item.getname().replace("\"", "\\\"")).append("\",");
            sb.append("\"price\":").append(item.getprice()).append(",");
            sb.append("\"category\":\"").append(item.getcategory().replace("\"", "\\\"")).append("\",");
            sb.append("\"type\":\"").append(item instanceof Vegitems ? "Veg" : "Non-Veg").append("\"");
            sb.append("}");
            if (i < menuitems.size() - 1) {
                sb.append(",");
            }
        }
        sb.append("]");
        sb.append("}");
        return sb.toString();
    }
}
