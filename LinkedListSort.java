public class LinkedListSort {
    static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    Node head;

    public void insert(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            return;
        }
        Node current = head;
        while (current.next != null) {
            current = current.next;
        }
        current.next = newNode;
    }// temp =Node(77)
     // if (head ==null)
     // head=temp
     // else if (temp.data<head.data)
     // temp.next=head;
     // head=temp
     // else:
     // curr=head
     // if(curr.next.data<temp.data)
     // curr=curr.next
    // temp.next=curr.next;
    // curr.next=temp;

    public void insertSorted(Node temp) {
        if (head == null || head.data >= temp.data) {
            temp.next = head;
            head = temp;
            return;
        }
        Node current = head;
        while (current.next != null && current.next.data < temp.data) {
            current = current.next;
        }
        temp.next = current.next;
        current.next = temp;
    }

    public void display() {
        Node current = head;
        while (current != null) {
            System.out.print(current.data + " ");
            current = current.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        LinkedListSort list = new LinkedListSort();
        list.insert(10);
        list.insert(20);
        list.insert(30);
        list.insert(40);
        list.insert(50);

        Node temp = new Node(35);
        list.insertSorted(temp);

        list.display();
    }
}
