class InnerMeth1 {
    void add() {
        int a = 10;
        int b = 20;
        int c = a + b;
        System.out.println(c);
    }

}

public class Meth1 {
    public static void main(String[] args) {
        InnerMeth1 calc = new InnerMeth1();
        calc.add();
    }

}
