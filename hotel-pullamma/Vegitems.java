public class Vegitems extends Menuitems {
    private String vegType; // e.g., Vegan, Dairy-Based, Pure-Veg

    public Vegitems(String name, double price, String category, String vegType) {
        super(name, price, category);
        this.vegType = vegType;
    }

    public String getvegType() {
        return this.vegType;
    }

    public void setvegType(String vegType) {
        this.vegType = vegType;
    }

    @Override
    public void prepare() {
        System.out.println("[PREPARATION] Preparing Veg item: " + getname() + " (" + vegType + "). Fresh ingredients are washed, chopped, and assembled.");
    }
}
