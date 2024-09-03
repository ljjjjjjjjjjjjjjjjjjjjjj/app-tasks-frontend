import { useEffect, useState } from 'react';
import { CategoryModel } from '../../models/CategoryModel';
import { TaskDetailedModel } from '../../models/TaskDetailedModel';
import { ProjectModel } from '../../models/ProjectModel';
import { fetchUserProjects } from '../../api/ProjectsApi';
import { useAuth } from '../../context/AuthContext';
import { createTask, fetchTaskDetailedyId, updateTask } from '../../api/TasksApi';
import { createCategory, fetchCategories } from '../../api/CategoriesApi';
import { fetchEmployeesWithImagesAll } from '../../api/EmployeesApi';
import { CustomSelect } from '../../components/common/CustomSelect';

import './TaskPageModal.scss'
import { TaskModel } from '../../models/TaskModel';
import { CustomDropdown } from '../../components/common/CustomDropdown';
import { EmployeeNameAndImageModel } from '../../models/EmployeeNameAndImageModel';

interface TaskPageModalProps {
  task: TaskDetailedModel;
  onClose: () => void;
  onTaskUpdated: (updatedTask: TaskDetailedModel) => void;
}

const priorityOptions = [
  { label: 'Highest', value: 'HIGHEST' },
  { label: 'High', value: 'HIGH' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'Low', value: 'LOW' },
  { label: 'Lowest', value: 'LOWEST' }
];

export function TaskPageModal ({ task, onClose, onTaskUpdated }: TaskPageModalProps) {
  const { state } = useAuth();
  
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [employees, setEmployees] = useState<EmployeeNameAndImageModel[]>([]);
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [formTask, setFormTask] = useState<TaskDetailedModel>({ ...task });
  const [newAssignedToId, setNewAssignedToId] = useState<string>('');

  
  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };

    const getEmployees = async () => {
      const employeesData = await fetchEmployeesWithImagesAll();
      setEmployees(employeesData);
    };

    const getUserProjects = async () => {
      if (state.user?.employeeId) {
        const projectsData = await fetchUserProjects(state.user.employeeId)
        setProjects(projectsData);
      }
    };
    
    getCategories();
    getEmployees();
    getUserProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormTask(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === 'add-new') {
      const newCategoryName = prompt('Enter new category name:');
      if (newCategoryName) {
        try {
          const newCategory = await createCategory(newCategoryName);
          setCategories([...categories, newCategory]);
          setFormTask(prevState => ({
            ...prevState,
            category: newCategory,
          }));
        } catch (error) {
          console.error('Failed to create category', error);
        }
      }
    } else {
      const category = categories.find(cat => cat.categoryId === selectedCategory);
      setFormTask(prevState => ({
        ...prevState,
        category,
      }));
    }
  };

  const handleAssignEmployee = () => { 
    const selectedEmployee = employees.find(emp => emp.employeeId === newAssignedToId);
    if (selectedEmployee) {
      setFormTask(prevState => ({
        ...prevState,
        assignedToEmployee: selectedEmployee,
      }));
      setNewAssignedToId('');
    }
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const taskToSave: TaskModel = {
          taskId: formTask.taskId,
          title: formTask.title,
          category: formTask.category,
          description: formTask.description,
          createdById: state.user?.employeeId || '',
          assignedToId: formTask.assignedToEmployee?.employeeId,
          status: formTask.status,
          priority: formTask.priority,
          projectId: formTask.projectId,
          createdDate: formTask.createdDate,
          assignedDate: formTask.assignedDate,
          unassignedDate: formTask.unassignedDate,
          doneDate: formTask.doneDate,
      };

      if (!formTask.taskId && state.user) {
          const createdTask = await createTask(taskToSave);
          const detailedTask = await fetchTaskDetailedyId(createdTask.taskId!);
          onTaskUpdated(detailedTask);
      } else {
          await updateTask(taskToSave, formTask.taskId!);
          onTaskUpdated(formTask);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save task', error);
    }
  };


  return (
    <div className="task-modal">
      <h3 className='task-title'>{task.taskId ? task.title : "New task"} </h3>
      
      <form onSubmit={handleSubmit}>

        <div className='task-form-item'>
          <label htmlFor="title">
            Title:
          </label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formTask.title} 
            onChange={handleChange} 
            required />
        </div>

        <div className='task-form-item'>
          <label htmlFor="category">
            Category:
          </label>
          <select id="category" name="category" value={formTask.category?.categoryId || ''} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))}
            <option value="add-new">Add new category</option>
          </select>
          
        </div>


        <div className='task-form-item'>
          <label htmlFor="description">
            Description:
          </label>
          <textarea 
            id="description" 
            name="description" 
            value={formTask.description || ''} 
            onChange={handleChange}>
          </textarea>
        </div>


        <div className='task-form-item'>
          <CustomDropdown   
            labelTitle="Assigned To: "
            employees={employees}   
            setSelectedEmployeeId={setNewAssignedToId}   
            handleEmployeeAction={handleAssignEmployee}  
            placeholderText="Search employee..."    
          />
        </div>


        <div className='task-form-item'>
          <label htmlFor="status">
            Status:
          </label>
          <select id="status" name="status" value={formTask.status} onChange={handleChange}>
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="DONE">Done</option>
          </select>
        </div>


        <div className='task-form-item'>
          <label htmlFor="priority">
            Priority:
          </label>
          <CustomSelect
            options={priorityOptions}
            value={formTask.priority}
            onChange={(value: string) => setFormTask(prevState => ({ ...prevState, priority: value }))}
          />
        </div>


        <div className='task-form-item'>
          <label htmlFor="projectId">
            Project:
          </label>
          <select id="projectId" name="projectId" value={formTask.projectId || ''} onChange={handleChange}>
            <option value="">
              Individual tasks
            </option>
            {projects.map(project => (
              <option key={project.projectId} value={project.projectId}>
                {project.projectName}
              </option>
            ))}
          </select>
        </div>


        <div className='task-form-submit-buttons'>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>

      </form>
    </div>
  );
};