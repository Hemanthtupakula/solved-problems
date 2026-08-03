public class Queue {
    private int[] arr;
    private int front;
    private int rear;
    private int capacity;
    private int size;

    public Queue(int capacity) {
        this.capacity = capacity;
        this.arr = new int[capacity];
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }

    public boolean isFull() {
        return size == capacity;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public void enqueue(int item) {
        if (isFull()) {
            System.out.println("Queue is full! Cannot enqueue " + item);
            return;
        }
        rear = (rear + 1) % capacity;
        arr[rear] = item;
        size++;
        System.out.println(item + " enqueued to queue");
    }

    public int dequeue() {
        if (isEmpty()) {
            System.out.println("Queue is empty! Cannot dequeue");
            return -1;
        }
        int item = arr[front];
        front = (front + 1) % capacity;
        size--;
        System.out.println(item + " dequeued from queue");
        return item;
    }

    public int getFront() {
        if (isEmpty()) {
            System.out.println("Queue is empty!");
            return -1;
        }
        return arr[front];
    }

    public int getRear() {
        if (isEmpty()) {
            System.out.println("Queue is empty!");
            return -1;
        }
        return arr[rear];
    }

    public void display() {
        if (isEmpty()) {
            System.out.println("Queue is empty!");
            return;
        }
        System.out.print("Queue elements: ");
        int count = 0;
        int i = front;
        while (count < size) {
            System.out.print(arr[i] + " ");
            i = (i + 1) % capacity;
            count++;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Queue queue = new Queue(5);

        System.out.println("--- Queue Operations Demonstration ---");
        
        System.out.println("Is queue empty? " + queue.isEmpty());
        
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        queue.enqueue(40);
        
        queue.display();

        System.out.println("Front element is: " + queue.getFront());
        System.out.println("Rear element is: " + queue.getRear());

        queue.dequeue();
        queue.display();

        System.out.println("Front element is now: " + queue.getFront());
        
        queue.enqueue(50);
        queue.enqueue(60);
        queue.display();
        
        System.out.println("Rear element is now: " + queue.getRear());
        
        queue.enqueue(70);
        
        System.out.println("Is queue full? " + queue.isFull());
    }
}
