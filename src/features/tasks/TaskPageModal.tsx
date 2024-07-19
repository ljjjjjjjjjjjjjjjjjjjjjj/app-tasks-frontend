import { useEffect, useState } from 'react';
import { CategoryModel } from '../../models/CategoryModel';
import { EmployeeModel } from '../../models/EmployeeModel';
import { TaskDetailedModel } from '../../models/TaskDetailedModel';
import { ProjectModel } from '../../models/ProjectModel';
import { fetchUserProjects } from '../../api/ProjectsApi';
import { useAuth } from '../../context/AuthContext';
import { updateTask } from '../../api/TasksApi';
import { createCategory, fetchCategories } from '../../api/CategoriesApi';
import { fetchEmployees } from '../../api/EmployeesApi';
import { CustomSelect } from '../../components/common/CustomSelect';

import './TaskPageModal.scss'

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
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [formTask, setFormTask] = useState<TaskDetailedModel>({ ...task });

  // fetching all relevant fields
  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };

    const getEmployees = async () => {
      const employeesData = await fetchEmployees();
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

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTask(formTask, formTask.taskId!);
      onTaskUpdated(formTask);
      onClose();
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };


  return (
    <div className="task-modal">
      <h3 className='task-title'>{task.title}</h3>
      
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
          <label htmlFor="assignedToId">
            Assigned To:
          </label>
          <select 
            id="assignedToId" 
            name="assignedToId" 
            value={formTask.assignedToId || ''} 
            onChange={handleChange}>
              <option value="">
                None
              </option>
              {employees.map(employee => (
                <option key={employee.employeeId} value={employee.employeeId}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
          </select>
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