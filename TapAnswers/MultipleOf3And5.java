package TapAnswers;

import java.util.Scanner;

public class MultipleOf3And5 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        if (n % 5 == 0 && n % 3 == 0) {
            System.out.println("Yes");
        } else {
            System.out.println("No");
        }

    }
}
