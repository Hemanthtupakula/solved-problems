package TapAnswers;

import java.util.Scanner;

public class ArrayEvenIndexElements {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int size = scanner.nextInt();
        int arr[] = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = scanner.nextInt();
        }
        printEvenIndexArrayElements(arr);

    }

    public static void printEvenIndexArrayElements(int[] arr) {
        for(int i=0;i<arr.length;i++){
            if(i%2==0){
                System.out.print(arr[i]+" ");
            }
        }
}
