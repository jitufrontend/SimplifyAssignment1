import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  // Reserved for future enhancements (e.g., modal details)

  useEffect(() => {
    let isMounted = true
    async function fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        const data = await response.json()
        if (isMounted) {
          setUsers(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || 'Something went wrong')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }
    fetchUsers()
    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
        <p className="loader-text">Loading users...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row g-3">
        {users.map((user) => {
          const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.username)}`
          return (
            <div key={user.id} className="col-12">
              <div className="card p-3">
                <div className="row g-3 align-items-start">
                  <div className="col-auto">
                    <div className="avatar-wrap">
                      <img className="avatar" src={avatar} alt={`${user.username} avatar`} />
                    </div>
                  </div>
                  <div className="col user-info">
                    <h2 className="name">{user.name}</h2>
                    <p className="field"><span className="label fw-bold">Email:</span>{user.email}</p>
                    <p className="field"><span className="label fw-bold">Phone:</span>{user.phone}</p>
                    <p className="field"><span className="label fw-bold">Company:</span>{user.company?.name}</p>
                    <p className="field"><span className="label fw-bold">Website:</span><a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>
                    <p className="field"><span className="label fw-bold">Address:</span>{user.address?.suite}, {user.address?.street}, {user.address?.city}, {user.address?.zipcode}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
