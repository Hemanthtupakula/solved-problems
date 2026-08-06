package TapAnswers;

import java.util.Scanner;

public class FirstNOddNum {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        for (int i = 1; i <= n; i++) {
            System.out.print(2 * i - 1 + " ");
        }
        // Write your code here
    }
}
