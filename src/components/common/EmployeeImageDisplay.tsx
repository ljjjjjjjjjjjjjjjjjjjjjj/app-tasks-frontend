import { EmployeeNameAndImageModel } from "../../models/EmployeeNameAndImageModel";

interface EmployeeImageDisplayProps {
  employee: EmployeeNameAndImageModel;
}


export function EmployeeImageDisplay ({ employee }: EmployeeImageDisplayProps) {

  return (
    <img
      src={employee.imageData 
        ? `data:image/jpeg;base64,${employee.imageData}` 
        : `${process.env.PUBLIC_URL}/images/default/default-profile-photo.jpeg`}
      alt={`${employee.firstName} ${employee.lastName}`}
      className="employee-image"
    />
  );
};