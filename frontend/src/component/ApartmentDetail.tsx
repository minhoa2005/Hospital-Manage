import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apartmentService from '../service/apartment.ts';

export default function ApartmentDetail() {
    const { id } = useParams();
    const [data, setData]: any = useState({});
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors]: any = useState({});

    const validateForm = () => {
        const newErrors: any = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!location.trim()) newErrors.location = 'Location is required';
        if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
        else if (!/^\d{10,}$/.test(phoneNumber.replace(/\D/g, ''))) {
            newErrors.phoneNumber = 'Please enter a valid phone number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const result: any = await apartmentService.getById(id!);
            console.log(result);
            if (result.success) {
                setData(result.data[0])
                setName(result.data[0]?.Name);
                setLocation(result.data[0]?.Location);
                setPhoneNumber(result.data[0].PhoneNumber);
            }
            else {
                alert(result.message);
            }
        }
        catch (error) {
            alert(error);
        }
        finally {
            setLoading(false);
        }
    }

    const handleSave = async () => {
        if (!validateForm()) return;

        if (!window.confirm('Are you sure you want to save these changes?')) return;

        try {
            setSaving(true);
            const data = {
                name: name,
                location: location,
                phoneNumber: phoneNumber,
            }
            const result = await apartmentService.updateDepartment(id!, data);
            if (result.success) {
                alert('Changes saved successfully!');
            }
            else {
                alert('Failed to save changes');
            }
        }
        catch (error) {
            alert('Error: ' + error);
        }
        finally {
            setSaving(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [id])

    if (loading) {
        return (
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }
            }>
                <div className="text-center" >
                    <div className="spinner-border text-primary" role="status" >
                        <span className="visually-hidden" > Loading...</span>
                    </div>
                    < p className="mt-3 text-muted" > Loading apartment details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='container-fluid py-4' >
            <div className="row justify-content-center" >
                <div className="col-lg-8 col-xl-6" >
                    <div className="card shadow-sm border-0" >
                        <div className="card-header bg-primary text-white" >
                            <h4 className="card-title mb-0" >
                                <i className="fas fa-building me-2" > </i>
                                Apartment Details
                            </h4>
                        </div>
                        < div className="card-body p-4" >
                            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                                <div className="row" >
                                    <div className="col-12" >
                                        <div className="mb-4" >
                                            <label className="form-label fw-bold text-muted" >
                                                <i className="fas fa-id-card me-2" > </i>Department ID
                                            </label>
                                            < input
                                                className='form-control form-control-lg bg-light'
                                                value={data?.DepartmentID || ''}
                                                disabled
                                                style={{ fontFamily: 'monospace' }}
                                            />
                                            < small className="form-text text-muted" > This field cannot be modified </small>
                                        </div>
                                    </div>
                                </div>

                                < div className="row" >
                                    <div className="col-md-6" >
                                        <div className="mb-4" >
                                            <label className="form-label fw-bold" >
                                                <i className="fas fa-tag me-2" > </i>Name *
                                            </label>
                                            < input
                                                className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                    if (errors.name) setErrors({ ...errors, name: '' });
                                                }}
                                                placeholder="Enter apartment name"
                                            />
                                            {errors.name && <div className="invalid-feedback"> {errors.name} </div>}
                                        </div>
                                    </div>
                                    < div className="col-md-6" >
                                        <div className="mb-4" >
                                            <label className="form-label fw-bold" >
                                                <i className="fas fa-map-marker-alt me-2" > </i>Location *
                                            </label>
                                            < input
                                                className={`form-control form-control-lg ${errors.location ? 'is-invalid' : ''}`}
                                                value={location}
                                                onChange={(e) => {
                                                    setLocation(e.target.value);
                                                    if (errors.location) setErrors({ ...errors, location: '' });
                                                }}
                                                placeholder="Enter location"
                                            />
                                            {errors.location && <div className="invalid-feedback"> {errors.location} </div>}
                                        </div>
                                    </div>
                                </div>

                                < div className="row" >
                                    <div className="col-md-6" >
                                        <div className="mb-4" >
                                            <label className="form-label fw-bold" >
                                                <i className="fas fa-phone me-2" > </i>Phone Number *
                                            </label>
                                            < input
                                                className={`form-control form-control-lg ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                                value={phoneNumber}
                                                onChange={(e) => {
                                                    setPhoneNumber(e.target.value);
                                                    if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
                                                }}
                                                placeholder="Enter phone number"
                                                type="tel"
                                            />
                                            {errors.phoneNumber && <div className="invalid-feedback"> {errors.phoneNumber} </div>}
                                        </div>
                                    </div>
                                </div>

                                < div className="d-flex gap-3 mt-4" >
                                    <button
                                        type="submit"
                                        className='btn btn-primary btn-lg px-4'
                                        disabled={saving}
                                    >
                                        {
                                            saving ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" > </span>
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-save me-2" > </i>
                                                    Save Changes
                                                </>
                                            )}
                                    </button>
                                    < button
                                        type="button"
                                        className="btn btn-outline-secondary btn-lg px-4"
                                        onClick={() => window.history.back()}
                                    >
                                        <i className="fas fa-arrow-left me-2" > </i>
                                        Back
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
