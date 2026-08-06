package TapAnswers;

import java.util.Scanner;

public class CelsuisToFarhenhit {
    static void celsiusToFahrenheit(int celsius) {
        // Write your code here
        double farhrenheit = (celsius * 9.0 / 5) + 32;
        System.out.printf("%.1f", farhrenheit);
    }

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int celsius = scan.nextInt();
        celsiusToFahrenheit(celsius);
    }

}
