import styles from "./form-page.module.css";
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

function FormPage({ title, isValidForm, onSubmit, textButton, children }) {
  return (
    <>
      <h1 className="text text_type_main-medium mb-6">{title}</h1>
      <form className={`${styles.form_container}`}>
        {children}
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          disabled={!isValidForm}
          onClick={onSubmit}
        >
          {textButton}
        </Button>
      </form>
    </>
  );
};

FormPage.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  textButton: PropTypes.string.isRequired,
  isValidForm: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormPage;
