package TapAnswers;

import java.util.Scanner;

public class CommonMultiples {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = sc.nextInt();
        int n1 = sc.nextInt();
        int n2 = sc.nextInt();

        commonMultiples(n1, n2, count);
        // implement your logic here
    }

    public static void commonMultiples(int n1, int n2, int count) {

        int hcf = findHcf(n1, n2);
        int lcm = (n1 / hcf) * n2;
        for (int i = 1; i <= count; i++) {
            System.out.print((lcm * i) + " ");
        }
    }

    public static int findHcf(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

}
