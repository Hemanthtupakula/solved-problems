import java.util.Scanner;

class InnerMeth2 {
    int a = 10;
    int b = 20;
    int c;

    int add() {
        c = a + b;
        return c;
    }

}

public class Meth2 {
    public static void main(String[] args) {
        InnerMeth2 calc = new InnerMeth2();
        int res = calc.add();
        System.out.println(res);
        Scanner sc=new Scanner(System.in);
        long k=sc.nextLong()
    }
}
