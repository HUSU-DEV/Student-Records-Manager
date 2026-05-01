import { useEffect, useMemo, useState } from 'react';
import './App.css';

const STORAGE_KEY = 'student-records-manager.students';

const initialStudents = [
  {
    studentId: 'SRM-1001',
    firstName: 'Amina',
    lastName: 'Rahman',
    email: 'amina.rahman@example.com',
    course: 'Computer Science',
    year: 'Year 2',
    status: 'Active',
  },
  {
    studentId: 'SRM-1002',
    firstName: 'Daniel',
    lastName: 'Morgan',
    email: 'daniel.morgan@example.com',
    course: 'Data Analytics',
    year: 'Year 3',
    status: 'Active',
  },
  {
    studentId: 'SRM-1003',
    firstName: 'Priya',
    lastName: 'Shah',
    email: 'priya.shah@example.com',
    course: 'Cyber Security',
    year: 'Year 1',
    status: 'On leave',
  },
];

const emptyStudent = {
  studentId: '',
  firstName: '',
  lastName: '',
  email: '',
  course: '',
  year: 'Year 1',
  status: 'Active',
};

function loadStudents() {
  try {
    const savedStudents = window.localStorage.getItem(STORAGE_KEY);
    return savedStudents ? JSON.parse(savedStudents) : initialStudents;
  } catch {
    return initialStudents;
  }
}

function App() {
  const [students, setStudents] = useState(loadStudents);
  const [studentForm, setStudentForm] = useState(emptyStudent);
  const [editingStudentId, setEditingStudentId] = useState(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const activeCount = useMemo(
    () => students.filter((student) => student.status === 'Active').length,
    [students],
  );

  function updateFormField(field, value) {
    setStudentForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function resetForm() {
    setStudentForm(emptyStudent);
    setEditingStudentId(null);
  }

  function saveStudent(event) {
    event.preventDefault();

    const normalizedStudent = {
      studentId: studentForm.studentId.trim(),
      firstName: studentForm.firstName.trim(),
      lastName: studentForm.lastName.trim(),
      email: studentForm.email.trim(),
      course: studentForm.course.trim(),
      year: studentForm.year,
      status: studentForm.status,
    };

    if (editingStudentId) {
      setStudents((currentStudents) =>
        currentStudents.map((student) =>
          student.studentId === editingStudentId ? normalizedStudent : student,
        ),
      );
    } else {
      setStudents((currentStudents) => [...currentStudents, normalizedStudent]);
    }

    resetForm();
  }

  function editStudent(student) {
    setStudentForm(student);
    setEditingStudentId(student.studentId);
  }

  function deleteStudent(studentId) {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.studentId !== studentId),
    );

    if (editingStudentId === studentId) {
      resetForm();
    }
  }

  return (
    <main className="App">
      <section className="page-header">
        <div>
          <p className="eyebrow">Frontend mode</p>
          <h1>Student Records Manager</h1>
          <p className="intro">
            Manage student profiles locally now, with room for authentication
            and a real database later.
          </p>
        </div>
        <div className="summary-panel" aria-label="Student record summary">
          <strong>{students.length}</strong>
          <span>Total students</span>
          <strong>{activeCount}</strong>
          <span>Active students</span>
        </div>
      </section>

      <section className="records-layout">
        <form className="student-form" onSubmit={saveStudent}>
          <h2>{editingStudentId ? 'Edit student' : 'Add student'}</h2>

          <label>
            Student ID
            <input
              required
              type="text"
              value={studentForm.studentId}
              onChange={(event) => updateFormField('studentId', event.target.value)}
              disabled={Boolean(editingStudentId)}
              placeholder="SRM-1004"
            />
          </label>

          <label>
            First name
            <input
              required
              type="text"
              value={studentForm.firstName}
              onChange={(event) => updateFormField('firstName', event.target.value)}
              placeholder="First name"
            />
          </label>

          <label>
            Last name
            <input
              required
              type="text"
              value={studentForm.lastName}
              onChange={(event) => updateFormField('lastName', event.target.value)}
              placeholder="Last name"
            />
          </label>

          <label>
            Email
            <input
              required
              type="email"
              value={studentForm.email}
              onChange={(event) => updateFormField('email', event.target.value)}
              placeholder="student@example.com"
            />
          </label>

          <label>
            Course
            <input
              required
              type="text"
              value={studentForm.course}
              onChange={(event) => updateFormField('course', event.target.value)}
              placeholder="Computer Science"
            />
          </label>

          <div className="form-row">
            <label>
              Year
              <select
                value={studentForm.year}
                onChange={(event) => updateFormField('year', event.target.value)}
              >
                <option>Year 1</option>
                <option>Year 2</option>
                <option>Year 3</option>
                <option>Year 4</option>
              </select>
            </label>

            <label>
              Status
              <select
                value={studentForm.status}
                onChange={(event) => updateFormField('status', event.target.value)}
              >
                <option>Active</option>
                <option>On leave</option>
                <option>Graduated</option>
              </select>
            </label>
          </div>

          <div className="form-actions">
            <button type="submit">
              {editingStudentId ? 'Save changes' : 'Add student'}
            </button>
            {editingStudentId && (
              <button type="button" className="secondary-button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <section className="student-list" aria-label="Student records">
          <div className="section-heading">
            <h2>Records</h2>
            <span>{students.length} saved locally</span>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Year</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.studentId}>
                    <td>{student.studentId}</td>
                    <td>{student.firstName} {student.lastName}</td>
                    <td>{student.email}</td>
                    <td>{student.course}</td>
                    <td>{student.year}</td>
                    <td>
                      <span className="status-pill">{student.status}</span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button type="button" onClick={() => editStudent(student)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="danger-button"
                          onClick={() => deleteStudent(student.studentId)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
