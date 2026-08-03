class Customer {
    private int cID;
    private String cName;
    private long cNum;

    public Customer() {
        this.cID = 1;
        this.cName = "hkt";
        this.cNum = 99181810;
    }

    public Customer(String cName) {
        this();
        this.cName = cName;
    }

    public Customer(int cID, String cName, long cNum) {
        this(cName);
        this.cID = cID;
        this.cNum = cNum;
    }

    public int getID() {
        return cID;
    }

    public String getName() {
        return cName;
    }

    public long getNum() {
        return cNum;
    }
}

class Constru {
    public static void main(String[] args) {

        Customer c1 = new Customer(2, "Alex", 9965467832L);

        System.out.println(c1.getID());
        System.out.println(c1.getName());
        System.out.println(c1.getNum());
    }
}
