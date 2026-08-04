abstract class Payment {
    private String name;
    private int amt;

    public Payment(String name, int amt) {
        this.name = name;
        this.amt = amt;
    }

    public void display() {
        System.out.println(this.name);
        System.out.println(this.amt);
    }

    public abstract void pay();

    public String getName() {
        return this.name;
    }

    public int getAmt() {
        return amt;
    }

    public void setAmt(int amt) {
        this.amt = amt;
    }
}

class RockPayments extends Payment {
    public RockPayments(String name, int amt) {
        super(name, amt);
    }

    @Override
    public void pay() {
        System.out.println("rock payments");
    }
}

public class Abs {
    public static void main(String[] args) {
        Payment p = new RockPayments("hemanth", 1000);
        p.display();
        p.pay();
    }
}
