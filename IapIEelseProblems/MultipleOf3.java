package IapIEelseProblems;

import java.util.Scanner;

public class MultipleOf3 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        for (int i = 1; i <= n; i++) {
            System.out.print(3 * i + " ");
        }
        // Write your code here
    }
}
