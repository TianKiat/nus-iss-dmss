from sqlalchemy.orm import Session
from app.common.access_control import AccessRole, AccessUpdate
from run import SessionLocal
from fastapi import APIRouter, HTTPException, Depends
from app.apicontroller.access_control_controller import AccessControlContoller

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get(
        "/get_access_list",
        description="retrieve list of access",
)
def get_access_list(db: Session = Depends(get_db)):
    try:
        return AccessControlContoller().get_full_access_list(db)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex
    
@router.post(
        "/get_access_list_by_role",
        description="retrieve specific access list",
)
def get_access_list(inputID: AccessRole, db: Session = Depends(get_db)):
    try:
        return AccessControlContoller().get_access_control_by_role(db, inputID.roleID)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex)) from ex
    
@router.post(
        "/update_access_list",
        description="update specific role access list",
)    
def update_access_List(AccessUpdate: AccessUpdate, db: Session = Depends(get_db)):
    return AccessControlContoller().update_access_list(db, AccessUpdate.roleID, AccessUpdate.access_list)