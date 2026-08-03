package TapAnswers;

public class Occurrence
of SmallestElementinanArray
{

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int arr[] = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();

        }
        int res = smallNum(arr);
        System.out.println(res);
    }

    public static int smallNum(int arr[]) {
        int min = Integer.MAX_VALUE;
        int count = 0;

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
                count = 1;
            } else if (arr[i] == min) {
                count++;
            }
        }
        return count;
    }
}
