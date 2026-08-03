package TapAnswers;

import java.util.Scanner;

public class MultipleOf357 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        for (int i = 1; i <= n; i++) {
            if (i % 2 == 0 || i % 5 == 0 || i % 7 == 0) {
                System.out.print(i + " ");
            }
        }
        // Write your code here
    }
}
