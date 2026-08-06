public abstract class Menuitems implements Orderable, Discounts {
    private String name;
    private double price;
    private String category;
    private int totalorders = 0;

    public Menuitems(String name, double price, String category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    public void setprice(double price) {
        this.price = price;
    }

    public double getprice() {
        return this.price;
    }

    public String getname() {
        return this.name;
    }

    public String getcategory() {
        return this.category;
    }

    public void setcategory(String category) {
        this.category = category;
    }

    public int gettotalorders() {
        return this.totalorders;
    }

    public void incrementtotalorders() {
        this.totalorders++;
    }

    @Override
    public String getdescription() {
        return "The menu " + getname() + " of Price " + getprice();
    }

    @Override
    public double applydiscount(double discount) {
        return price - (discount / 100.0 * price);
    }

    @Override
    public abstract void prepare();
}
