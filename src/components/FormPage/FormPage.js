import styles from "./form-page.module.css";
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

function FormPage({ title, isValidForm, buttonIsInvisible, onSubmit, textButton, children }) {
  return (
    <>
      {title && (<h1 className="text text_type_main-medium mb-6">{title}</h1>)}
      <form className={`${styles.form_container}`} onSubmit={onSubmit} >
        {children}
        {!buttonIsInvisible && (<Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValidForm}
            >
          {textButton}
        </Button>)}
      </form>
    </>
  );
};

FormPage.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  textButton: PropTypes.string.isRequired,
  isValidForm: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default FormPage;
