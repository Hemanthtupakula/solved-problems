package TapAnswers;

import java.util.Scanner;

public class CylinderSurfaceArea {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int r = scanner.nextInt();
        int h = scanner.nextInt();
        double area = 2 * 3.142 * r * (r + h);
        System.out.printf("%.4f", area);
        // Write your code here
    }
}
