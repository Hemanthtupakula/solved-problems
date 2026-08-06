class InnerMeth4 {
    int c;

    int add(int a, int b) {
        c = a + b;
        return c;
    }

}

public class Meth4 {
    public static void main(String[] args) {
        int num1 = 200;
        int num2 = 213;
        InnerMeth4 calc = new InnerMeth4();
        int res = calc.add(num1, num2);
        System.out.println(res);

    }
}
