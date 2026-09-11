package com.fieldframe.shared.data

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

@Dao
interface ProjectDao {
    @Query("SELECT * FROM projects ORDER BY updatedAt DESC")
    fun observeAll(): Flow<List<ProjectEntity>>

    @Query("SELECT * FROM projects WHERE id = :id")
    fun observeById(id: String): Flow<ProjectEntity?>

    @Query("SELECT * FROM projects WHERE id = :id")
    suspend fun get(id: String): ProjectEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsert(entity: ProjectEntity)

    @Query("DELETE FROM projects WHERE id = :id")
    suspend fun delete(id: String)
}

@Dao
interface SectionDao {
    @Query("SELECT * FROM sections WHERE projectId = :projectId ORDER BY sortOrder ASC, name ASC")
    fun observeByProject(projectId: String): Flow<List<SectionEntity>>

    @Query("SELECT * FROM sections WHERE projectId = :projectId ORDER BY sortOrder ASC, name ASC")
    suspend fun listByProject(projectId: String): List<SectionEntity>

    @Query("SELECT * FROM sections WHERE id = :id")
    suspend fun get(id: String): SectionEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsert(entity: SectionEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsertAll(entities: List<SectionEntity>)

    @Update
    suspend fun update(entity: SectionEntity)

    @Query("DELETE FROM sections WHERE id = :id")
    suspend fun delete(id: String)

    @Query("DELETE FROM sections WHERE projectId = :projectId")
    suspend fun deleteByProject(projectId: String)
}

@Dao
interface PhotoDao {
    @Query("SELECT * FROM photos")
    fun observeAll(): Flow<List<PhotoEntity>>

    @Query("SELECT * FROM photos WHERE projectId = :projectId ORDER BY sortOrder ASC, createdAt ASC")
    fun observeByProject(projectId: String): Flow<List<PhotoEntity>>

    @Query("SELECT * FROM photos WHERE projectId = :projectId ORDER BY sortOrder ASC, createdAt ASC")
    suspend fun listByProject(projectId: String): List<PhotoEntity>

    @Query("SELECT * FROM photos WHERE sectionId = :sectionId ORDER BY sortOrder ASC, createdAt ASC")
    suspend fun listBySection(sectionId: String): List<PhotoEntity>

    @Query("SELECT * FROM photos WHERE id = :id")
    suspend fun get(id: String): PhotoEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsert(entity: PhotoEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsertAll(entities: List<PhotoEntity>)

    @Query("DELETE FROM photos WHERE id = :id")
    suspend fun delete(id: String)

    @Query("DELETE FROM photos WHERE projectId = :projectId")
    suspend fun deleteByProject(projectId: String)

    @Query("DELETE FROM photos WHERE sectionId = :sectionId")
    suspend fun deleteBySection(sectionId: String)
}
