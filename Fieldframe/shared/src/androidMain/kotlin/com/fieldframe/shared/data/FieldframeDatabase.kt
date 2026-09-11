package com.fieldframe.shared.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(
    entities = [ProjectEntity::class, SectionEntity::class, PhotoEntity::class],
    version = 1,
    exportSchema = false,
)
abstract class FieldframeDatabase : RoomDatabase() {
    abstract fun projects(): ProjectDao
    abstract fun sections(): SectionDao
    abstract fun photos(): PhotoDao

    companion object {
        fun create(context: Context): FieldframeDatabase =
            Room.databaseBuilder(context, FieldframeDatabase::class.java, "fieldframe.db")
                .fallbackToDestructiveMigration()
                .build()
    }
}
