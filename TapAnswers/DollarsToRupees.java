package TapAnswers;

import java.util.Scanner;

public class DollarsToRupees {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int dollar = scanner.nextInt();
        double rupees = dollar * 82.73;
        System.out.printf("%.4f", rupees);
        // Write your code here
    }
}
