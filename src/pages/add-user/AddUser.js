import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { sendData } from "../../utils/requests";

export default function AddUser() {
  const initialValues = { name: "", email: "", cell: "", age: "" };

  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState();
  const [isSubmit, setIsSubmit] = useState();

  const [serverResponse, setServerResponse] = useState();

  const history = useHistory();

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const errors = validateFormData(formData);

    if (errors.email?.length > 0 || errors.age?.length > 0) {
      setFormErrors(errors);
    } else {
      const response = await sendData(formData);
      if (response.status && response.status === 400) {
        setIsSubmit(false);
        setServerResponse(response.message);
      } else {
        setIsSubmit(true);
        setFormErrors({
          email: "",
          age: "",
        });
        setServerResponse("Form Submitted Successfully");
        setFormData(initialValues);
        setTimeout(() => {
          history.push("/app/view-users");
        }, 3000);
      }
    }
  };

  const validateFormData = (data) => {
    let { email, age } = data;
    const errors = {};

    if (!email.includes("@")) errors.email = "Enter Valid Email!";

    if (age < 18 || age > 60) errors.age = "Age must be between 18-60 years";

    return errors;
  };

  return (
    <>
      <PageTitle title="Add User" />
      {isSubmit && <h3 style={{ color: "green" }}>{serverResponse}</h3>}
      {!isSubmit && <h3 style={{ color: "red" }}>{serverResponse}</h3>}

      <form onSubmit={formSubmitHandler}>
        <div
          style={{
            width: window.innerWidth < 640 ? "70%" : "50%",
            margin: "auto",
          }}
        >
          <div style={{ marginBottom: "3%" }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                type="text"
                placeholder="Muhammad Ahmed"
                value={formData.name}
                onChange={(event) =>
                  setFormData({ ...formData, name: event.target.value })
                }
                required
              />
            </FormControl>
          </div>
          <div style={{ marginBottom: "3%" }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="Email">Email</InputLabel>
              <Input
                id="email"
                type="text" //change it to email to apply built-in validation
                placeholder="abc123@gmail.com"
                value={formData.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
                required
              />
            </FormControl>
            <p>
              {formErrors?.email?.length > 0 && !isSubmit
                ? formErrors.email
                : ""}
            </p>
          </div>
          <div style={{ marginBottom: "3%" }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="cell">Cell</InputLabel>
              <Input
                id="cell"
                type="text"
                placeholder="+92-335-5615648"
                value={formData.cell}
                onChange={(event) =>
                  setFormData({ ...formData, cell: event.target.value })
                }
                required
              />
            </FormControl>
          </div>
          <div style={{ marginBottom: "8%" }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="age">Age</InputLabel>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    age: parseInt(event.target.value),
                  })
                }
                required
              />
            </FormControl>
            <p>
              {formErrors?.age?.length > 0 && !isSubmit ? formErrors.age : ""}
            </p>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="medium"
              fullWidth
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
