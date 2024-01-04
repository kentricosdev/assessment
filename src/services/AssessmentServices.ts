// // services/crudService.ts
// import { db } from '../../firebase';
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   DocumentReference,
//   doc,
// } from 'firebase/firestore';

// interface Item {
//   id: string;
//   name: string;
// }

// const getItems = async (): Promise<Item[]> => {
//   try {
//     const querySnapshot = await getDocs(collection(db, 'items'));
//     return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Item));
//   } catch (error) {
//     console.error('Error fetching items:', error);
//     throw error;
//   }
// };

// const addItem = async (name: string): Promise<void> => {
//   try {
//     await addDoc(collection(db, 'items'), { name });
//   } catch (error) {
//     console.error('Error adding item:', error);
//     throw error;
//   }
// };

// const updateItem = async (itemId: string, newName: string): Promise<void> => {
//   try {
//     const itemRef: DocumentReference = doc(db, 'items', itemId);
//     await updateDoc(itemRef, { name: newName });
//   } catch (error) {
//     console.error('Error updating item:', error);
//     throw error;
//   }
// };

// const deleteItem = async (itemId: string): Promise<void> => {
//   try {
//     await deleteDoc(doc(db, 'items', itemId));
//   } catch (error) {
//     console.error('Error deleting item:', error);
//     throw error;
//   }
// };

// export { getItems, addItem, updateItem, deleteItem };
