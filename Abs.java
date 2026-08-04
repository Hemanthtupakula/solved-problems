interface Payment {
    void display();
    void pay();
    String getName();
    int getAmt();
    void setAmt(int amt);
}

class RockPayments implements Payment {
    private String name;
    private int amt;

    public RockPayments(String name, int amt) {
        this.name = name;
        this.amt = amt;
    }

    @Override
    public void display() {
        System.out.println(this.name);
        System.out.println(this.amt);
    }

    @Override
    public void pay() {
        System.out.println("rock payments");
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public int getAmt() {
        return this.amt;
    }

    @Override
    public void setAmt(int amt) {
        this.amt = amt;
    }
}

class CardPayments implements Payment {
    private String name;
    private int amt;

    public CardPayments(String name, int amt) {
        this.name = name;
        this.amt = amt;
    }

    @Override
    public void display() {
        System.out.println(this.name);
        System.out.println(this.amt);
    }

    @Override
    public void pay() {
        System.out.println("card payments");
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public int getAmt() {
        return this.amt;
    }

    @Override
    public void setAmt(int amt) {
        this.amt = amt;
    }
}

public class Abs {
    public static void main(String[] args) {
        Payment p1 = new RockPayments("hemanth", 1000);
        p1.display();
        p1.pay();

        System.out.println();

        Payment p2 = new CardPayments("tupakula", 2500);
        p2.display();
        p2.pay();
    }
}
