import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  confirmDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  confirmDelete,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Отстрани Документ</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Дали си сигурен дека сакаш да го отстраниш овој документ?
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={confirmDelete}>
            Отстрани
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Назад
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
