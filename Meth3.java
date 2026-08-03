class InnerMeth3 {
    int c;

    void add(int a, int b) {
        c = a + b;
        System.out.println(c);
    }

}

public class Meth3 {
    public static void main(String[] args) {
        int num1 = 20;
        int num2 = 53;
        InnerMeth3 calc = new InnerMeth3();
        calc.add(num1, num2);

    }
}
