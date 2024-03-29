import { db, collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, storage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from './firebaseConfig'
import { isDeletable } from "./../utils/Global"

const useGetData = (setData, collectionName) => {

  try {
    const unsub = onSnapshot(collection(db, collectionName), (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id })
      })
      setData && setData(documents)

    });

  } catch (error) {
    console.log(error)
  }

}

const useDelete = async (id, collectionName) => {
  await deleteDoc(doc(db, collectionName, id));
}

const useUploadPic = async (file, loc, setDownlodUrl, setIsloading) => {

  const storageRef = ref(storage, loc);
  const uploadTask = uploadBytesResumable(storageRef, file);
  await uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          setIsloading(true)
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      console.log(error), setIsloading(false)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setDownlodUrl(downloadURL), setIsloading(false)
      });
    }
  );
}
const useUploadDoc = async (data, collectionName) => {
  const userRef = doc(collection(db, collectionName));
  await setDoc(userRef, data);
}

const useUpdateDoc = async (id, data, collectionName) => {
  const docRef = doc(db, collectionName, id);
  const res = await updateDoc(docRef, data);
  console.log(res)
}

const useDeleteSignlePhoto = async (downloadUrl) => {
  
  if (!isDeletable(downloadUrl)){
    try {
      const photoRef = ref(storage, downloadUrl);
      downloadUrl && await deleteObject(photoRef),
      consoel.log("photo deleted")
    } catch (error) {
      console.log(error)
    }

    }
  }


export {
  useGetData, useDelete, useUploadPic, useUploadDoc, useUpdateDoc, useDeleteSignlePhoto
}
