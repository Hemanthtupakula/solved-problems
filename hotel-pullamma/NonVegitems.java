public class NonVegitems extends Menuitems {
    private String proteinSource; // e.g., Chicken, Fish, Egg, Mutton

    public NonVegitems(String name, double price, String category, String proteinSource) {
        super(name, price, category);
        this.proteinSource = proteinSource;
    }

    public String getproteinSource() {
        return this.proteinSource;
    }

    public void setproteinSource(String proteinSource) {
        this.proteinSource = proteinSource;
    }

    @Override
    public void prepare() {
        System.out.println("[PREPARATION] Preparing Non-Veg item: " + getname() + " (Protein: " + proteinSource + "). Quality meat is sourced, seasoned, cooked, and plated.");
    }
}
