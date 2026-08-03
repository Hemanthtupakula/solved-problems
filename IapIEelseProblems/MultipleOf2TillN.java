package IapIEelseProblems;

import java.util.Scanner;

public class MultipleOf2TillN {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        for (int i = 2; i <= n; i += 2) {
            System.out.print(i + " ");
        }
        // Write your code here
    }
}
