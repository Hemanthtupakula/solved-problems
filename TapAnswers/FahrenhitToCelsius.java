package TapAnswers;

import java.util.Scanner;

public class FahrenhitToCelsius {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int fahrenheit = scanner.nextInt();
        double celsius = (fahrenheit - 32) * 5 / 9.0;
        System.out.printf("%.4f", celsius);
        // Write your code here

    }
}
